from rest_framework import serializers
from .models import Account
from userprofile.models import UserProfile
from books.models import Books
from books.serializers import BookDetailSerializer

class AccountsSerializer(serializers.ModelSerializer):
    student=serializers.StringRelatedField()
    book=serializers.SerializerMethodField()
    bookid=serializers.SerializerMethodField()
    class Meta:
        model= Account
        fields=('student','book','data','bookid')
    def get_bookid(self,object):
        c=object.book.id
        return c;
    def get_book(self,obj):
        c=obj.book.book_details
        return BookDetailSerializer(c,context={'request':self.context.get('request')}).data


class AccountsCreateSerializer(serializers.ModelSerializer):
    Roll_number=serializers.CharField(max_length=20)
    Book_number=serializers.IntegerField()
    class Meta:
        model = Account
        fields = ('Roll_number','Book_number')
        extra_kwargs={'Roll_number','Book_number'}

    def create(self, validated_data):
        s=UserProfile.objects.get(roll_number=self.data['Roll_number'])
        b=Books.objects.get(id=self.data['Book_number'])
        s=Account(student=s,book=b)
        s.save()
        return s



