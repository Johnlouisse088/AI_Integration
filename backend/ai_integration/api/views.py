from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class ChatAPIView(APIView):
    def post(self, request):
        question = request.data.get("question")
        if not question:
            return Response({"error": "No question provided"}, status=400)

        try:
            print("Calling OpenAI...")
            response = client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": question}
                ]
            )
            print("OpenAI call successful!")
            answer = response.choices[0].message["content"]
            return Response({"answer": answer})
        except Exception as e:
            import traceback
            print("OpenAI call failed:", str(e))
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)
