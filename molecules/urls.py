from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'molecules', views.MoleculeViewSet)
router.register(r'predictions', views.PredictionViewSet)
router.register(r'queries', views.QueryLogViewSet, basename='queries')
router.register(r'drug-database', views.DrugDatabaseViewSet, basename='drug-database')
router.register(r'admin-dashboard', views.AdminDashboardViewSet, basename='admin-dashboard')

urlpatterns = [
    path('', include(router.urls)),
]