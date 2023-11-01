using System.Net;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2.DocumentModel;

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
    private async Task<string> QueryTable()
    {
        using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
        var response = await client.QueryAsync(new QueryRequest
        {
            TableName = "FeedingTimes",
            KeyConditionExpression = "Mother = :v_Mother and Father = :v_Father",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                {":v_Mother", new AttributeValue{S = "Heidi"}},
                {":v_Father", new AttributeValue{S = "Ville"}}
            }
        });
        List<Document> document = new List<Document>();
        foreach (var item in response.Items)
        {
            document.Add(Document.FromAttributeMap(item));
        }
        return document.ToJsonPretty();
    }
    private async Task<string> PostFeedingAsync(string time, string quantity)
    {
        using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
        var response = await client.UpdateItemAsync(new UpdateItemRequest
        {
            TableName = "FeedingTimes",
            Key = new Dictionary<string, AttributeValue> { { "Mother", new AttributeValue { S = "Heidi" } }, { "Father", new AttributeValue { S = "Ville" } } },
            UpdateExpression = "SET HeVi = list_append(#list, :vals)",
            ExpressionAttributeNames = new Dictionary<string, string>() { { "#list", "HeVi" } },
            ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                {":vals", new AttributeValue {L = new List<AttributeValue>() {
                    new AttributeValue {M = new Dictionary<string, AttributeValue> {{"Feeding", new AttributeValue {M = {{"quantity", new AttributeValue {N = quantity}},
                    {"time", new AttributeValue { S= time}}}}}}}
                }}}
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
    public async Task<APIGatewayProxyResponse> Get(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = await QueryTable(),
            Headers = getHeaders()
        };

        return response;
    }
    public async Task<APIGatewayProxyResponse> PostFeeding(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");
        var pathParameters = request.PathParameters.ToList();
        var time = pathParameters[0].Value;
        var quantity = pathParameters[1].Value;
        context.Logger.LogInformation("time:" + time + " quantity:" + quantity);
        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = await PostFeedingAsync(time, quantity),
            Headers = getHeaders()
        };

        return response;
    }
    public Dictionary<string, string> getHeaders()
    {
        var headers = new Dictionary<string, string> { { "Content-Type", "*" }, { "Access-Control-Allow-Headers", "Content-Type" }, { "Access-Control-Allow-Origin", "*" }, { "Access-Control-Allow-Methods", "*" } };
        return headers;
    }
}