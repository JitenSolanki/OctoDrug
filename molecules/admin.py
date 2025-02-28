from django.contrib import admin
from .models import (
    Molecule, Prediction, ToxicityPrediction, 
    TargetOrgan, DrugInteraction, QueryLog
)

class ToxicityPredictionInline(admin.StackedInline):
    model = ToxicityPrediction
    extra = 0

class TargetOrganInline(admin.TabularInline):
    model = TargetOrgan
    extra = 0

class DrugInteractionInline(admin.TabularInline):
    model = DrugInteraction
    extra = 0

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('id', 'molecule', 'solubility', 'logp', 'drug_likeness', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('molecule__name', 'molecule__smiles')
    inlines = [ToxicityPredictionInline, TargetOrganInline, DrugInteractionInline]

@admin.register(Molecule)
class MoleculeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'formula', 'molecular_weight', 'created_by', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'smiles', 'formula')

@admin.register(QueryLog)
class QueryLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'query_type', 'status', 'created_at', 'completed_at')
    list_filter = ('query_type', 'status', 'created_at')
    search_fields = ('user__username', 'query_data')