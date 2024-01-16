from rest_framework import serializers

class PruebaSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    string = serializers.CharField()
    date = serializers.DateTimeField(required=False)
    array = serializers.ListField()
    double = serializers.FloatField()
    boolean = serializers.BooleanField()
    inte = serializers.IntegerField()
    objid = serializers.CharField(max_length = 24, required=False)

class TokenSerializer(serializers.Serializer):
    idtoken = serializers.CharField()

class LogSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    tokenID = serializers.CharField()
    email = serializers.CharField()
    iat = serializers.DateTimeField()
    exp = serializers.DateTimeField()