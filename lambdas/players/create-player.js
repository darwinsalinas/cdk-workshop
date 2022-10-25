const { DynamoDB } = require('aws-sdk');

const db = new DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

    const player = JSON.parse(event.body);

    try {
        await db.put({
            TableName: process.env.PLAYERS_TABLE,
            Item: player
        }).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(player)
        };

    } catch (error) {
        console.log("🚀 ~ file: create-player.js ~ line 21 ~ exports.handler= ~ error", error)

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error'
            })
        };
    }
}