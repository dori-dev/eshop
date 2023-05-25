from rest_framework.views import APIView
from rest_framework.response import Response


class HelloAPIView(APIView):
    def get(self, request):
        return Response({
            'msg': "Hello, World!",
        })
