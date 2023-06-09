import os

from django.core.files.uploadhandler import TemporaryFileUploadHandler
from django.db import transaction

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from core.pdf_compressor import compress


@api_view(['POST'])
@permission_classes([AllowAny])
@transaction.atomic
def compress_pdf(request):
    """
        django file handlers are of two types
        ("django.core.files.uploadhandler.MemoryFileUploadHandler",
        "django.core.files.uploadhandler.TemporaryFileUploadHandler",)
        since we need to access the file path, we set TemporaryFileUploadHandler as the handler since MemoryFileUploadHandler which is memory
        has no path, and we need to access the path
        TemporaryFileUploadHandler handler has the method temporary_file_path() which gives us a path to work with
        memory files are stored in RAM, while temporary files are stored in hard disk, in a temp folder and are deleted later
    """

    request.upload_handlers = [TemporaryFileUploadHandler(request=request)]

    for key, values in request.FILES.items():
        # we first create an output file location to hold the compressed file
        output_file = f'/home/azwzach/Documents/compressor_folder/pdfs/{key}'

        # we compress the uploaded file
        compress(values.temporary_file_path(
        ), output_file, power=4)

        """
            we need to compare the input file and output file and take the one with the lower size and save that one
        """
        if os.stat(
                values.temporary_file_path()).st_size < os.stat(output_file).st_size:
            os.remove(output_file)
            os.remove(values.temporary_file_path())

        elif os.stat(output_file).st_size < os.stat(values.temporary_file_path()).st_size:
            os.remove(values.temporary_file_path())

    return Response({'detail': 'Files compressed successfully'}, status=200)
