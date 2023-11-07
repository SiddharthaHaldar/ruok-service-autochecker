import strawberry

import uvicorn

from fastapi import FastAPI

from strawberry.fastapi import GraphQLRouter

from constants import Settings

from graphql_types.query import Query
from graphql_types.mutation import Mutation

schema = strawberry.Schema(Query, Mutation)

graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host=Settings().GRAPHQL_HOST, port=Settings().GRAPHQL_PORT)
