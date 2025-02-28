from rest_framework import serializers
from .models import (
    Molecule, Prediction, ToxicityPrediction, 
    TargetOrgan, DrugInteraction, QueryLog
)
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class MoleculeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Molecule
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']

class ToxicityPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToxicityPrediction
        exclude = ['prediction']

class TargetOrganSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetOrgan
        exclude = ['prediction']

class DrugInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugInteraction
        exclude = ['prediction']

class PredictionSerializer(serializers.ModelSerializer):
    toxicity = ToxicityPredictionSerializer(read_only=True)
    target_organs = TargetOrganSerializer(many=True, read_only=True)
    drug_interactions = DrugInteractionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Prediction
        fields = '__all__'
        read_only_fields = ['created_at']

class MoleculeDetailSerializer(serializers.ModelSerializer):
    predictions = PredictionSerializer(many=True, read_only=True)
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Molecule
        fields = '__all__'

class QueryLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    molecule = MoleculeSerializer(read_only=True)
    
    class Meta:
        model = QueryLog
        fields = '__all__'
        read_only_fields = ['created_at', 'completed_at']

class SMILESInputSerializer(serializers.Serializer):
    smiles = serializers.CharField(required=True)
    name = serializers.CharField(required=False, allow_blank=True)

class MOLFileInputSerializer(serializers.Serializer):
    mol_file = serializers.CharField(required=True)
    name = serializers.CharField(required=False, allow_blank=True)

class DrugSearchSerializer(serializers.Serializer):
    query = serializers.CharField(required=True)
    search_type = serializers.ChoiceField(
        choices=['name', 'smiles', 'formula', 'all'],
        default='all'
    )