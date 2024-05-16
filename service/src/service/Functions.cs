using System.Net;
using System;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2.DocumentModel;
using System.Text.Json;
using Amazon.Extensions.NETCore.Setup;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentity;
using Amazon.Extensions.CognitoAuthentication;
using Amazon.CognitoIdentityProvider.Model;
using System.Security.Cryptography;
using System.Runtime.CompilerServices;
using System.Text;
using System.IdentityModel.Tokens.Jwt;



// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace service;

public class Functions
{
    public static class CognitoHashCalculator
    {

        public static string GetSecretHash(string username, string appClientId, string appSecretKey)
        {
            var dataString = username + appClientId;

            var data = Encoding.UTF8.GetBytes(dataString);
            var key = Encoding.UTF8.GetBytes(appSecretKey);

            return Convert.ToBase64String(HmacSHA256(data, key));
        }

        public static byte[] HmacSHA256(byte[] data, byte[] key)
        {
            using (var shaAlgorithm = new HMACSHA256(key))
            {
                var result = shaAlgorithm.ComputeHash(data);
                return result;
            }
        }
    }
    /// <summary>
    /// Default constructor that Lambda will invoke.
    /// </summary>
    public Functions()
    {
    }
    private async Task<string> CognitoSignUpAsync(string username, string password, string clienId, string email)
    {
        AmazonCognitoIdentityProviderClient provider = new AmazonCognitoIdentityProviderClient(RegionEndpoint.EUWest1);
        var userAttrs = new AttributeType { Name = "email", Value = email };
        var userAttrsList = new List<AttributeType> { userAttrs };
        var response = await provider.SignUpAsync(new SignUpRequest
        {
            UserAttributes = userAttrsList,
            ClientId = clienId,
            Username = username,
            Password = password,
            SecretHash = CognitoHashCalculator.GetSecretHash(username, clienId, "1refrj396gpnerhmo8cdd6dlthkulqo6tlfv39ph4vj4ipv4vaq0")
        });
        return response.HttpStatusCode == HttpStatusCode.OK ? "User login successfully" : "User login failed";
    }
    private async Task<string> CognitoLoginAsync(string username, string password, ILambdaContext context)
    {
        AmazonCognitoIdentityProviderClient provider = new AmazonCognitoIdentityProviderClient(RegionEndpoint.EUWest1);
        var clientSecret = "1refrj396gpnerhmo8cdd6dlthkulqo6tlfv39ph4vj4ipv4vaq0";
        var clientId = "7l0gb8dt3sjh2d66gh2scm3hiv";
        CognitoUserPool userPool = new CognitoUserPool("eu-west-1_GJgfgbUM4", "7l0gb8dt3sjh2d66gh2scm3hiv", provider);
        CognitoUser user = new CognitoUser(username, clientId, userPool, provider, clientSecret);
        InitiateSrpAuthRequest authRequest = new InitiateSrpAuthRequest()
        {
            Password = password,
        };

        AuthFlowResponse authResponse = await user.StartWithSrpAuthAsync(authRequest).ConfigureAwait(false);
        var tokenHandler = new JwtSecurityTokenHandler();
        var accessToken = authResponse.AuthenticationResult.AccessToken;
        var valitedToken = tokenHandler.ReadToken(accessToken);
        var tokenList = RemoveSpecialCharacters(valitedToken.ToString()!).Split(',');
        context.Logger.LogInformation("Token:" + tokenList?[2].Substring(7));
        var response = new Document { { "AccesToken", accessToken }, { "Uuid", tokenList?[2].Substring(7).Trim() } }.ToJsonPretty();
        return response;
    }
    private string RemoveSpecialCharacters(string str)
    {
        foreach (char c in str)
        {
            if (c == '{' || c == '}')
            {
                str = str.Replace(c, ' ');
            }
            if (c == '.')
            {
                str = str.Replace(c, ',');
            }
        }
        return str;
    }
    private string CognitoLogout(string username, string clienId)
    {
        AmazonCognitoIdentityProviderClient provider = new AmazonCognitoIdentityProviderClient(RegionEndpoint.EUWest1);
        var clientSecret = "1refrj396gpnerhmo8cdd6dlthkulqo6tlfv39ph4vj4ipv4vaq0";
        CognitoUserPool userPool = new CognitoUserPool("eu-west-1_GJgfgbUM4", "7l0gb8dt3sjh2d66gh2scm3hiv", provider);
        CognitoUser user = new CognitoUser(username, clienId, userPool, provider, clientSecret);
        user.SignOut();
        return "User sign out successfully";
    }
    private async Task<string> QueryCalendarData()
    {
        using var client = new AmazonDynamoDBClient(RegionEndpoint.EUWest1);
        var response = await client.QueryAsync(new QueryRequest
        {
            TableName = "CalendarData",
            KeyConditionExpression = "UserUUID = :v_UserUUID",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                {":v_UserUUID", new AttributeValue{S = "aa1c6070-f8d9-4739-88db-dc1b5cff1efe"}}
            }
        });
        List<Document> document = new List<Document>();
        foreach (var item in response.Items)
        {
            document.Add(Document.FromAttributeMap(item));
        }
        return document.ToJsonPretty();
    }
    private async Task<string> QueryUserData()
    {
        using var client = new AmazonDynamoDBClient(RegionEndpoint.EUWest1);
        var response = await client.QueryAsync(new QueryRequest
        {
            TableName = "User",
            KeyConditionExpression = "UserUUID = :v_UserUUID",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                {":v_UserUUID", new AttributeValue{S = "aa1c6070-f8d9-4739-88db-dc1b5cff1efe"}}
            }
        });
        List<Document> document = new List<Document>();
        foreach (var item in response.Items)
        {
            document.Add(Document.FromAttributeMap(item));
        }
        return document[0].ToJsonPretty();
    }
    private async Task<string> PostFeedingAsync(string type, string time, string quantity, string icon, string date)
    {
        using var client = new AmazonDynamoDBClient(RegionEndpoint.EUWest1);
        try
        {
            var response = await client.UpdateItemAsync(new UpdateItemRequest
            {
                TableName = "CalendarData",
                Key = new Dictionary<string, AttributeValue> { { "UserUUID", new AttributeValue { S = "aa1c6070-f8d9-4739-88db-dc1b5cff1efe" } }, { "Date", new AttributeValue { S = date } } },
                UpdateExpression = "SET #list = list_append(#list, :vals)",
                ExpressionAttributeNames = { { "#list", "activities" } },
                ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                    {":vals",
                    new AttributeValue {L = new List<AttributeValue>() {new AttributeValue {M = new Dictionary<string, AttributeValue> {{"quantity", new AttributeValue {S = quantity}}, {"icon", new AttributeValue {S = icon}},
                        {"time", new AttributeValue { S= time}}, {"type", new AttributeValue { S= type}}}}}}
                    }
                },
                ReturnValues = "ALL_NEW"
            });
            Document document = Document.FromAttributeMap(response.Attributes);
            return document.ToJsonPretty();
        }
        catch (System.Exception)
        {
            var response = await client.PutItemAsync(
                new PutItemRequest
                {
                    TableName = "CalendarData",
                    Item = {{"UserUUID", new AttributeValue { S = "aa1c6070-f8d9-4739-88db-dc1b5cff1efe"}}, {"Date", new AttributeValue {S = date}}, {"activities", new AttributeValue {L = new List<AttributeValue>() {new AttributeValue {M = new Dictionary<string, AttributeValue> {{"quantity", new AttributeValue {S = quantity}}, {"icon", new AttributeValue {S = icon}},
                        {"time", new AttributeValue { S= time}}, {"type", new AttributeValue { S= type}}}}}}}}
                }
            );
            Document document = Document.FromAttributeMap(response.Attributes);
            return document.ToJsonPretty();
        }
    }


    /// <summary>
    /// A Lambda function to respond to HTTP Get methods from API Gateway
    /// </summary>
    /// <param name="request"></param>
    /// <returns>The API Gateway response.</returns>
    /// 
    public async Task<APIGatewayProxyResponse> SignUp(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var requestBody = JsonSerializer.Deserialize<Dictionary<string, string>>(request.Body.ToString());
        context.Logger.LogInformation("Username:" + requestBody?["username"] + " Password:" + requestBody?["password"] + " ClientId:" + requestBody?["clientId"] + " Email:" + requestBody?["email"]);
        if (requestBody != null && requestBody.ContainsKey("username") && requestBody.ContainsKey("password") && requestBody.ContainsKey("clientId") && requestBody.ContainsKey("email"))
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = await CognitoSignUpAsync(requestBody["username"], requestBody["password"], requestBody["clientId"], requestBody["email"]),
                Headers = getHeaders()
            };
            return response;
        }
        else
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Body of request not found!",
                Headers = getHeaders()
            };
            return response;
        }
    }
    public APIGatewayProxyResponse Logout(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var requestBody = JsonSerializer.Deserialize<Dictionary<string, string>>(request.Body.ToString());
        context.Logger.LogInformation("Username:" + requestBody?["username"] + " ClientId:" + requestBody?["clientId"]);
        if (requestBody != null && requestBody.ContainsKey("username") && requestBody.ContainsKey("clientId"))
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = CognitoLogout(requestBody["username"], requestBody["clientId"]),
                Headers = getHeaders()
            };
            return response;
        }
        else
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Body of request not found!",
                Headers = getHeaders()
            };
            return response;
        }
    }
    public async Task<APIGatewayProxyResponse> Login(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var requestBody = JsonSerializer.Deserialize<Dictionary<string, string>>(request.Body.ToString());
        context.Logger.LogInformation("Username:" + requestBody?["username"] + " Password:" + requestBody?["password"]);
        if (requestBody != null && requestBody.ContainsKey("username") && requestBody.ContainsKey("password"))
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = await CognitoLoginAsync(requestBody["username"], requestBody["password"], context),
                Headers = getHeaders()
            };
            return response;
        }
        else
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Body of request not found!",
                Headers = getHeaders()
            };
            return response;
        }
    }
    public async Task<APIGatewayProxyResponse> GetUserData(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = await QueryUserData(),
            Headers = getHeaders()
        };

        return response;
    }
    public async Task<APIGatewayProxyResponse> GetCalendarData(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = await QueryCalendarData(),
            Headers = getHeaders()
        };

        return response;
    }

    public class ActivityData
    {
        public string? time { get; set; }
        public string? quantity { get; set; }
        public string? type { get; set; }
        public string? icon { get; set; }
    }
    public async Task<APIGatewayProxyResponse> PostFeeding(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var requestBody = JsonSerializer.Deserialize<ActivityData>(request.Body.ToString());
        context.Logger.LogInformation("time:" + requestBody?.time + " quantity:" + requestBody?.quantity + "Type:" + requestBody?.type + "Icon:" + requestBody?.icon);
        if (requestBody != null && requestBody.icon != null && requestBody.time != null && requestBody.quantity != null && requestBody.type != null)
        {
            DateTime dateTime;
            DateTime.TryParseExact(requestBody.time, "yyyy-MM-ddTHH:mm", null, System.Globalization.DateTimeStyles.None, out dateTime);
            context.Logger.LogInformation("dateTime:" + dateTime.ToString());
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = await PostFeedingAsync(requestBody.type, requestBody.time, requestBody.quantity, requestBody.icon, dateTime.Date.ToString("d")),
                Headers = getHeaders()
            };
            return response;
        }
        else
        {
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Body of request not found!",
                Headers = getHeaders()
            };
            return response;
        }
    }
    public Dictionary<string, string> getHeaders()
    {
        var headers = new Dictionary<string, string> { { "Content-Type", "*" }, { "Access-Control-Allow-Headers", "Content-Type" }, { "Access-Control-Allow-Origin", "*" }, { "Access-Control-Allow-Methods", "*" } };
        return headers;
    }
}