from django.db import models
from django.contrib.auth.models import User

class Molecule(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    smiles = models.TextField()
    mol_file = models.TextField(blank=True, null=True)
    formula = models.CharField(max_length=255, blank=True, null=True)
    molecular_weight = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='molecules')
    
    def __str__(self):
        return self.name or self.smiles[:50]

class Prediction(models.Model):
    molecule = models.ForeignKey(Molecule, on_delete=models.CASCADE, related_name='predictions')
    solubility = models.FloatField(blank=True, null=True)
    logp = models.FloatField(blank=True, null=True)
    drug_likeness = models.FloatField(blank=True, null=True)
    bioavailability = models.FloatField(blank=True, null=True)
    half_life = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Prediction for {self.molecule}"

class ToxicityPrediction(models.Model):
    prediction = models.OneToOneField(Prediction, on_delete=models.CASCADE, related_name='toxicity')
    hepatotoxicity = models.FloatField(blank=True, null=True)
    cardiotoxicity = models.FloatField(blank=True, null=True)
    nephrotoxicity = models.FloatField(blank=True, null=True)
    neurotoxicity = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return f"Toxicity for {self.prediction.molecule}"

class TargetOrgan(models.Model):
    prediction = models.ForeignKey(Prediction, on_delete=models.CASCADE, related_name='target_organs')
    organ = models.CharField(max_length=255)
    probability = models.FloatField()
    
    def __str__(self):
        return f"{self.organ} ({self.probability})"

class DrugInteraction(models.Model):
    SEVERITY_CHOICES = [
        ('Low', 'Low'),
        ('Moderate', 'Moderate'),
        ('High', 'High'),
    ]
    
    prediction = models.ForeignKey(Prediction, on_delete=models.CASCADE, related_name='drug_interactions')
    drug = models.CharField(max_length=255)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.drug} - {self.severity}"

class QueryLog(models.Model):
    QUERY_TYPE_CHOICES = [
        ('structure_drawing', 'Structure Drawing'),
        ('smiles_upload', 'SMILES Upload'),
        ('mol_upload', 'MOL Upload'),
        ('database_search', 'Database Search'),
        ('property_prediction', 'Property Prediction'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='queries')
    molecule = models.ForeignKey(Molecule, on_delete=models.SET_NULL, null=True, blank=True)
    query_type = models.CharField(max_length=50, choices=QUERY_TYPE_CHOICES)
    query_data = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    error_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.query_type} by {self.user.username} at {self.created_at}"