const { DynamoDB } = require('aws-sdk');

const db = new DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let players = [];
    try {
        const data = await db.scan({
            TableName: process.env.PLAYERS_TABLE
        }).promise();

        if (data && data.Items) {
            players = data.Items;
        }
    } catch (error) {
        console.log("🚀 ~ file: list-all-player.js ~ line 21 ~ exports.handler= ~ error", error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(players)
    };
}