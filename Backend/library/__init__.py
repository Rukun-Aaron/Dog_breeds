"""Initialize Flask app."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import Settings


def create_app(config=None, aargs=None):
    match config:
        case "portable":
            Settings.FLASK_ENV = "production"
            Settings.FLASK_DEPLOYMENT = "client+server"
        case "installed":
            AppData = aargs[0]
            publisherName = aargs[1]
            appName = aargs[2]

            config = {}
            Settings.FLASK_ENV = "production"
            Settings.FLASK_DEPLOYMENT = "client+server"

            Settings.UPLOAD_FOLDER = f"{AppData}/{publisherName}/{appName}/library/static/uploads/"
            Settings.STORAGE_FOLDER = f"{AppData}/{publisherName}/{appName}/library/static/storage/"
            # Settings.MODEL_FOLDER = './library/models/'
        case None:
            pass
    tags_metadata = [
        {
            "name": "Utilities",
            "description": "Core of the API. Contains functions that are designed for the frontend."
        },
        {
            "name": "Home",
            "description": "Api dedicated to serving the React App for local app client+server deployment.\n This API is not used for web-based deployment."
        },
        {
            "name": "Insects",
            "description": "API dedicated to serving insect information.\n This API fetches data from GBIF.\n This API requires a GBIF account to be configured in the .env file."
        }

    ]
    if Settings.FLASK_ENV == "development":
        app = FastAPI(openapi_tags=tags_metadata)
    else:
        app = FastAPI(openapi_tags=tags_metadata, docs_url=None, redoc_url=None)

    origins = [
        "http://localhost",
        "http://localhost:80",
        "http://localhost:5000"
        "http://localhost:6789",
        "http://localhost:3000",
        "https://code-critters-b5d86.web.app"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # if not config:
    #     model_config = SettingsConfigDict(env_file=".env")
    # else:
    #     for key, value in config.items():
    #         app.config[key] = value

    # app.config["DIR_PATH"] = os.path.dirname(os.path.realpath(__file__))

    # if test_config is not None:
    #     app.config.from_mapping(test_config)
    # else:
    #     tests = False

    # app.register_blueprint(home.home_blueprint)

    # print(Settings.model_dump())

    
    # from .utilities import utilities, file_exports
    # from .insects import insectinfo
    # app.include_router(utilities.utils_api)
    # app.include_router(file_exports.utils_api)
    # app.include_router(insectinfo.insect_api)

    # # Lets flask deploy react build only if it is a client+server deployment
    # if Settings.FLASK_DEPLOYMENT != "server" or Settings.FLASK_ENV == "development":
    #     from .home import home
    #     # NOTE: REGISTER home_router LAST AS IT HOSTS A CATCH ALL ROUTE AND WILL OVERRIDE OTHER ROUTES
    #     app.include_router(home.home_router)

    # return app
