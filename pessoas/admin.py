from django.contrib import admin, messages
from django.utils.translation import ngettext

from .models import Pessoa


@admin.register(Pessoa)
class PessoaAdmin(admin.ModelAdmin):
    list_display = ("nome", "tipo_chave", "chave_pix", "situacao")
    list_filter = ("ativo", "tipo_chave")
    search_fields = ("nome", "chave_pix")
    ordering = ("nome",)
    actions = ("inativar_pessoas",)

    @admin.display(description="Situação", ordering="ativo")
    def situacao(self, obj):
        return "Ativa" if obj.ativo else "Inativa"

    @admin.action(description="Inativar pessoas selecionadas")
    def inativar_pessoas(self, request, queryset):
        quantidade = 0
        for pessoa in queryset.filter(ativo=True).iterator():
            pessoa.ativo = False
            pessoa.save(update_fields=("ativo", "atualizado_em"))
            quantidade += 1

        mensagem = ngettext(
            "%d pessoa foi inativada.",
            "%d pessoas foram inativadas.",
            quantidade,
        ) % quantidade
        self.message_user(request, mensagem, level=messages.SUCCESS)

    def has_delete_permission(self, request, obj=None):
        return False
