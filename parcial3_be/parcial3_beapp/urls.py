from django.urls import path
from parcial3_beapp import views

urlpatterns = [

    path('api/pagos/<str:idp>/', views.pago),
    path('api/pagos/', views.pagos),
    path('api/log/<str:idl>/', views.log),
    path('api/log/', views.logs),
    path('api/image/upload', views.upload_image),
    path('logged', views.oauth)

]