from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


api = [
    path('products/', include('products.urls')),
    path('accounts/', include('accounts.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')),
    path('api/v1/', include(api)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
