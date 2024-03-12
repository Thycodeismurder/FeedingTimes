using System.Net;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2.DocumentModel;
using System.Text.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace service;

public class Functions
{
    /// <summary>
    /// Default constructor that Lambda will invoke.
    /// </summary>
    public Functions()
    {
    }
    private async Task<string> QueryCalendarData()
    {
        using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
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
        using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
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
    private async Task<string> PostFeedingAsync(string type, string time, string quantity, string icon)
    {
        using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
        var response = await client.UpdateItemAsync(new UpdateItemRequest
        {
            TableName = "CalendarData",
            Key = new Dictionary<string, AttributeValue> { { "UserUUID", new AttributeValue { S = "aa1c6070-f8d9-4739-88db-dc1b5cff1efe" } }, { "Date", new AttributeValue { S = "2023-11-13" } } },
            UpdateExpression = "SET #list = list_append(#list, :vals)",
            ExpressionAttributeNames = new Dictionary<string, string>() { { "#list", "activities" } },
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


    /// <summary>
    /// A Lambda function to respond to HTTP Get methods from API Gateway
    /// </summary>
    /// <param name="request"></param>
    /// <returns>The API Gateway response.</returns>
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

    public class ActivityData {
        public string? Time {get; set;}
        public string? Quantity {get; set;}
        public string? Type {get; set;}
        public string? Icon {get; set;}
    }
    public async Task<APIGatewayProxyResponse> PostFeeding(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var requestBody = JsonSerializer.Deserialize<ActivityData>(request.Body.ToString());
        context.Logger.LogInformation("time:" + requestBody?.Time + " quantity:" + requestBody?.Quantity + "Type:"+ requestBody?.Type+ "Icon:"+ requestBody?.Icon);
        if (requestBody != null && requestBody.Icon != null && requestBody.Time != null && requestBody.Quantity != null && requestBody.Type != null) {
        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = await PostFeedingAsync(requestBody.Type, requestBody.Time, requestBody.Quantity, requestBody.Icon),
            Headers = getHeaders()
        };
        return response;
        } else {
            var response = new APIGatewayProxyResponse {
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