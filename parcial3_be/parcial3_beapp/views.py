from django.http import HttpResponse
from parcial3_beapp.serializers import PruebaSerializer, TokenSerializer, LogSerializer
import pymongo
import requests

from google.oauth2 import id_token
from google.auth.transport import requests

import cloudinary
import cloudinary.uploader

from datetime import datetime
from geopy.geocoders import Nominatim

from bson import ObjectId
from rest_framework.response import Response

from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

# -------- Geopy ---------
geolocator = Nominatim(user_agent="my_geocoder")

# Conexión a la base de datos MongoDB
my_client = pymongo.MongoClient('mongodb+srv://parcial:parcial@1parcial23.zzs3aop.mongodb.net/')

# Nombre de la base de datos
dbname = my_client['parcial3final']

# Colecciones
collection_prueba = dbname["prueba"]
collection_log = dbname["log"]


# ---------------- EL CRUD DE LAS TABLAS ---------------------- 

@api_view(['GET', 'POST'])
def pruebas(request):
    if request.method == 'GET':
        prueba = list(collection_prueba.find({}))        
        for p in prueba:
            p['_id'] = str(ObjectId(p.get('_id',[])))
            p['objid'] = str(ObjectId(p.get('objid',[])))

        prueba_serializer = PruebaSerializer(data=prueba, many= True)
        if prueba_serializer.is_valid():
            json_data = prueba_serializer.data
            return Response(json_data, status=status.HTTP_200_OK)
        else:
            return Response(prueba_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'POST':
        serializer = PruebaSerializer(data=request.data)
        if serializer.is_valid():
            prueba = serializer.validated_data
            prueba['_id'] = ObjectId()
            prueba['date'] = datetime.now()
            prueba['array'] = []
            prueba['objid'] = ObjectId(prueba['objid'])
            result = collection_prueba.insert_one(prueba)
            if result.acknowledged:
                return Response({"message": "Producto creado con éxito."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Algo salió mal. Producto no creado."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def prueba(request, idp):
    if request.method == 'PUT':
        serializer = PruebaSerializer(data=request.data)
        if serializer.is_valid():
            prueba = serializer.validated_data
            prueba['_id'] = ObjectId(idp)
            result = collection_prueba.replace_one({'_id': ObjectId(idp)}, prueba)
            if result.acknowledged:
                return Response({"message": "Usuario actualizado con éxito",},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": "Algo salió mal. Usuario no actualizado."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'GET':
            p = collection_prueba.find_one({'_id': ObjectId(idp)})
            p['_id'] = str(ObjectId(p.get('_id', [])))
            p['objid'] = str(ObjectId(p.get('objid', [])))

            serializer = PruebaSerializer(data=p)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'DELETE' :
        delete_data = collection_prueba.delete_one({'_id': ObjectId(idp)})
        if delete_data.deleted_count == 1:
            return Response({"mensaje": "Usuario eliminado con éxito"}, status=status.HTTP_200_OK)
        else:
            return Response({"ERROR": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        


# ---------------- IMÁGENES ----------------------
        
@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST' and request.FILES.getlist('images'):
        uploaded_files = request.FILES.getlist('images')
        uploaded_urls = []

        # Upload each image to Cloudinary
        cloudinary.config(
                cloud_name="dsr356a9z",
                api_key="216828456522265",
                api_secret="OWVoBppOphupt67TZSHyDHogmQ4"
            )

        for file in uploaded_files:
            upload_result = cloudinary.uploader.upload(
                file,
                folder='examen'
            )
            uploaded_urls.append(upload_result['secure_url'])
        return JsonResponse({'urls': uploaded_urls})
    return HttpResponse(status=400)


# ---------------- TOKEN OAUTH ----------------------

CLIENT_ID = '97897189905-91u0q02ni37ctgtgege5uidl9cefa6gt.apps.googleusercontent.com'

@api_view(['POST'])
def oauth(request):
    if request.method == 'POST':
        serializer = TokenSerializer(data=request.data)
        if serializer.is_valid():
            tokenData = serializer.validated_data
            try:
                token = tokenData['idtoken']
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                userid = idinfo['sub']
                if userid:
                    return Response({"userid": userid,},
                                    status=status.HTTP_200_OK)
            except ValueError:
                # Invalid token
                
                return Response({"error": "Token no valido: "+token,},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# ------------------ CREACION LOG -------------------------
        
@api_view(['GET', 'POST'])
def logs(request):
    if request.method == 'GET':
        log = list(collection_log.find({}))        
        for l in log:
            l['_id'] = str(ObjectId(l.get('_id',[])))

        log_serializer = LogSerializer(data=log, many= True)
        if log_serializer.is_valid():
            json_data = log_serializer.data
            return Response(json_data, status=status.HTTP_200_OK)
        else:
            return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        serializer = LogSerializer(data=request.data)
        if serializer.is_valid():
            log = serializer.validated_data
            log['_id'] = ObjectId()
            result = collection_log.insert_one(log)
            if result.acknowledged:
                return Response({"message": "Log creado con éxito."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Algo salió mal. Log no creado."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def log(request, idl):
    if request.method == 'GET':
            l = collection_log.find_one({'tokenID': idl})
            l['_id'] = str(ObjectId(l.get('_id', [])))

            serializer = LogSerializer(data=l)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# ------------------------ GEOCODING -----------------
# @api_view(["GET"])
# def find_by_lon_and_lat(request, direccion):
#     if request.method == "GET":
#         location = geolocator.geocode(direccion)
#         if location:
#             query = {
#                 "lat": {
#                     "$gte": location.latitude - 0.2,
#                     "$lte": location.latitude + 0.2,
#                 },
#                 "lon": {
#                     "$gte": location.longitude - 0.2,
#                     "$lte": location.longitude + 0.2,
#                 },
#             }
#             prueba = list(collection_prueba.find(query).sort("timestamp", pymongo.ASCENDING))
#             for p in prueba:
#                 p["_id"] = str(ObjectId(p.get("_id", [])))

#             prueba_serializer = PruebaSerializer(data=prueba, many=True)
#             if prueba_serializer.is_valid():
#                 json_data = prueba_serializer.data
#                 return Response(json_data, status=status.HTTP_200_OK)
#             else:
#                 return Response(
#                     prueba_serializer.errors, status=status.HTTP_400_BAD_REQUEST
#                 )
#         else:
#             return Response({"error": "Dirección no válida"})