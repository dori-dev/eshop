from django.views import View
from django.http import JsonResponse


class Hello(View):
    def get(self, request):
        return JsonResponse({
            'msg': "Hello, World!",
        })
