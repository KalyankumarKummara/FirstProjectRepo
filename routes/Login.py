from fastapi import APIRouter
from models.Login import LoginUser
import bcrypt
import pymongo 

myclient= pymongo.MongoClient("mongodb://localhost:27017/")
DB = myclient["Project"]
mycol= DB["Usercol"]

UserLogin = APIRouter()
@UserLogin.post("/Login")
async def UserAccount(request:LoginUser):
    Username = request.Username
    Password = request.Password.encode()
    Userdata = mycol.find_one({"Username":Username},{"_id":0})
    if not Userdata:
        return{"UnSuccess"}
    else:
        hashed_password = Userdata["Password"].encode()
        # comparing Password with hashed Password
        if bcrypt.checkpw(Password, hashed_password): 
            return{"Success"}
        else:
            return{"UnSuccess"}
