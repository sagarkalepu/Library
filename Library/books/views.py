from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from .serializers import BookDetailSerializer,BookTagsSerializer,BookDetailsDetailSerializer,BookDetailsCreateSerializer
from .models import BookDetails,BookTags
from django.db.models import Q


class BookListAPIView(generics.ListAPIView):
    serializer_class = BookDetailSerializer
    def get_queryset(self):
        try:
            if self.kwargs['query']:
                query=self.kwargs['query']
                return BookDetails.objects.filter(Q(title__icontains=query)|Q(author__icontains=query))

        except:
            return BookDetails.objects.all()

class BookDetailsAPIView(generics.RetrieveAPIView):
    serializer_class = BookDetailsDetailSerializer
    queryset = BookDetails.objects.all()

class BookTagListView(generics.ListAPIView):

        def get_serializer_class(self):
            try:
                tag = self.kwargs['query']
                if tag:
                    return BookDetailSerializer
            except:
                return BookTagsSerializer

        def get_queryset(self):
            try:
                tag=self.kwargs['query']
                if tag:
                    print(tag)
                    return BookDetails.objects.filter(tag__tags__iexact=tag)
            except:
                return BookTags.objects.all()



class BookCreateAPIView(generics.CreateAPIView):
    serializer_class = BookDetailsCreateSerializer
    queryset = BookDetails.objects.all()


    def save(self,*args,**kwargs):
        super(BookCreateAPIView,self).save(*args,**kwargs)



