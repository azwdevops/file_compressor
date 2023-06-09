from django.urls import path

from core.api.views import views


urlpatterns = (
    path('compress-pdf/', views.compress_pdf, name='compress_pdf'),
)
