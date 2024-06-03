import strawberry

import uvicorn
import operator

from fastapi import FastAPI

from strawberry.fastapi import GraphQLRouter
from strawberry.schema.config import StrawberryConfig

from constants import Settings

from graphql_types.query import Query
from graphql_types.mutation import Mutation
from fastapi.middleware.cors import CORSMiddleware

def default_resolver(root, field):
    try:
        return operator.getitem(root, field)
    except KeyError:
        return getattr(root, field)

config = StrawberryConfig(
    default_resolver=default_resolver
)

schema = strawberry.Schema(query=Query, mutation=Mutation)

graphql_app = GraphQLRouter(schema)

app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host=Settings().GRAPHQL_HOST, port=Settings().GRAPHQL_PORT)
