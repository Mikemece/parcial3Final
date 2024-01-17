from rest_framework import serializers

class PagoSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    concepto = serializers.CharField()
    timestamp = serializers.DateTimeField(required=False)
    importe = serializers.FloatField()
    email = serializers.CharField()
    token = serializers.CharField()
    localizacion = serializers.CharField()
    #cpostal = serializers.CharField(required=False)
    long = serializers.FloatField()
    lat = serializers.FloatField()
    imagen = serializers.CharField()

class TokenSerializer(serializers.Serializer):
    idtoken = serializers.CharField()

class LogSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    tokenID = serializers.CharField()
    email = serializers.CharField()
    iat = serializers.DateTimeField()
    exp = serializers.DateTimeField()