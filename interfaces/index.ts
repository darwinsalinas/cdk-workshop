import { LambdaStack } from "../lib/lambda-stack";
import { DynamoStack } from '../lib/dynamo-stack';

export interface StackBasicProps {
    name: string;
    env: string;
    account: string;
    region: string;
}


export interface ApiStackProps extends StackBasicProps {
    lambdaStack: LambdaStack;
}


export interface LambdaStackProps extends StackBasicProps {
    dynamoStack: DynamoStack;
}