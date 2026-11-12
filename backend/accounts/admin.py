from django.contrib import admin

from .models import WatchedTitle


@admin.register(WatchedTitle)
class WatchedTitleAdmin(admin.ModelAdmin):
    list_display = ("user", "title_id", "watched_at")
    list_filter = ("watched_at",)
    search_fields = ("user__username", "title_id")
