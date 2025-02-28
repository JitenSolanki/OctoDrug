from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
import json

from .models import (
    Molecule, Prediction, ToxicityPrediction, 
    TargetOrgan, DrugInteraction, QueryLog
)
from .serializers import (
    MoleculeSerializer, MoleculeDetailSerializer, PredictionSerializer,
    QueryLogSerializer, SMILESInputSerializer, MOLFileInputSerializer,
    DrugSearchSerializer
)

class MoleculeViewSet(viewsets.ModelViewSet):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MoleculeDetailSerializer
        return MoleculeSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['post'])
    def process_smiles(self, request):
        serializer = SMILESInputSerializer(data=request.data)
        if serializer.is_valid():
            # Create query log
            query_log = QueryLog.objects.create(
                user=request.user,
                query_type='smiles_upload',
                query_data=json.dumps(serializer.validated_data),
                status='processing'
            )
            
            try:
                # In a real app, this would process the SMILES using RDKit
                # and generate predictions using ML models
                
                # For now, we'll create a molecule record
                molecule = Molecule.objects.create(
                    smiles=serializer.validated_data['smiles'],
                    name=serializer.validated_data.get('name', ''),
                    created_by=request.user
                )
                
                # Update query log
                query_log.molecule = molecule
                query_log.status = 'completed'
                query_log.completed_at = timezone.now()
                query_log.save()
                
                # Return the molecule data
                return Response(
                    MoleculeDetailSerializer(molecule).data,
                    status=status.HTTP_201_CREATED
                )
            
            except Exception as e:
                # Update query log with error
                query_log.status = 'failed'
                query_log.error_message = str(e)
                query_log.completed_at = timezone.now()
                query_log.save()
                
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['post'])
    def process_mol_file(self, request):
        serializer = MOLFileInputSerializer(data=request.data)
        if serializer.is_valid():
            # Create query log
            query_log = QueryLog.objects.create(
                user=request.user,
                query_type='mol_upload',
                query_data=json.dumps({'name': serializer.validated_data.get('name', '')}),
                status='processing'
            )
            
            try:
                # In a real app, this would process the MOL file using RDKit
                # and generate predictions using ML models
                
                # For now, we'll create a molecule record
                molecule = Molecule.objects.create(
                    mol_file=serializer.validated_data['mol_file'],
                    name=serializer.validated_data.get('name', ''),
                    created_by=request.user
                )
                
                # Update query log
                query_log.molecule = molecule
                query_log.status = 'completed'
                query_log.completed_at = timezone.now()
                query_log.save()
                
                # Return the molecule data
                return Response(
                    MoleculeDetailSerializer(molecule).data,
                    status=status.HTTP_201_CREATED
                )
            
            except Exception as e:
                # Update query log with error
                query_log.status = 'failed'
                query_log.error_message = str(e)
                query_log.completed_at = timezone.now()
                query_log.save()
                
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class PredictionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

class QueryLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QueryLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Regular users can only see their own queries
        if not self.request.user.is_staff:
            return QueryLog.objects.filter(user=self.request.user)
        # Staff users can see all queries
        return QueryLog.objects.all()

class DrugDatabaseViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def search(self, request):
        serializer = DrugSearchSerializer(data=request.data)
        if serializer.is_valid():
            # Create query log
            query_log = QueryLog.objects.create(
                user=request.user,
                query_type='database_search',
                query_data=json.dumps(serializer.validated_data),
                status='processing'
            )
            
            try:
                # In a real app, this would search the PubChem API
                # For now, we'll return a mock response
                
                # Update query log
                query_log.status = 'completed'
                query_log.completed_at = timezone.now()
                query_log.save()
                
                # Mock response
                return Response({
                    'results': [
                        {
                            'id': 2244,
                            'name': 'Aspirin',
                            'formula': 'C9H8O4',
                            'molecular_weight': 180.16,
                            'smiles': 'CC(=O)OC1=CC=CC=C1C(=O)O',
                            'category': 'NSAID',
                            'image': 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2244&t=l'
                        },
                        {
                            'id': 3672,
                            'name': 'Ibuprofen',
                            'formula': 'C13H18O2',
                            'molecular_weight': 206.29,
                            'smiles': 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
                            'category': 'NSAID',
                            'image': 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=3672&t=l'
                        }
                    ]
                })
            
            except Exception as e:
                # Update query log with error
                query_log.status = 'failed'
                query_log.error_message = str(e)
                query_log.completed_at = timezone.now()
                query_log.save()
                
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class AdminDashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        # In a real app, this would calculate actual statistics
        # For now, we'll return mock data
        return Response({
            'stats': {
                'totalUsers': 1248,
                'activeUsers': 876,
                'totalQueries': 15782,
                'averageResponseTime': 1.2
            },
            'userActivity': {
                'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                'datasets': [
                    {
                        'label': 'Active Users',
                        'data': [650, 730, 810, 790, 850, 870, 876],
                    },
                    {
                        'label': 'New Users',
                        'data': [120, 85, 90, 70, 95, 80, 75],
                    }
                ]
            },
            'queryTypes': {
                'labels': ['Structure Drawing', 'SMILES Upload', 'MOL Upload', 'Database Search', 'Property Prediction'],
                'datasets': [
                    {
                        'label': 'Query Distribution',
                        'data': [4215, 3842, 2103, 3521, 2101],
                    }
                ]
            },
            'modelPerformance': {
                'labels': ['Solubility', 'Toxicity', 'Drug-likeness', 'Target Prediction', 'Interaction'],
                'datasets': [
                    {
                        'label': 'Accuracy',
                        'data': [0.87, 0.82, 0.91, 0.78, 0.84],
                    }
                ]
            }
        })