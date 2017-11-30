from rest_framework import serializers
from .models import Books,BookTags,BookDetails


class BookTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookTags
        fields=('tags',)


class BookDetailsDetailSerializer(serializers.ModelSerializer):
    remaining_books=serializers.SerializerMethodField()
    class Meta:
        model=BookDetails
        fields=('id','title','author','remaining_books')

    def get_remaining_books(self,obj):
        return (obj.book.filter(available=True).count())





class BookDetailsCreateSerializer(serializers.ModelSerializer):
    no_of_books=serializers.IntegerField()
    tag=BookTagsSerializer(many=True).data
    class Meta:
        model=BookDetails
        fields=('id','title','author','description','no_of_books','tag')
#        read_only_fields=('no_of_books',)
        extra_kwargs={'no_of_books':{'read_only':True}}

    def create(self, validated_data):
        bookdetails=BookDetails(
            title=validated_data['title'],
            author=validated_data['author'],
            description=validated_data['description']
        )
        bookdetails.save(force_insert=True)
        for tag in validated_data['tag']:
            bookdetails.tag.add(tag)
        bookdetails.save()
        bookdetails.copies(self.data['no_of_books'])
        return bookdetails






class BookDetailSerializer(serializers.HyperlinkedModelSerializer):
    tag=BookTagsSerializer(many=True)
    remaining_books = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name='books:bookdetails', format='html')
    class Meta:
        model=BookDetails
        fields=('id','tag','title','author','url','remaining_books')
        depth=1
    def get_remaining_books(self,obj):
        return (obj.book.filter(available=True).count())
