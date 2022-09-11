import { args } from "./args.ts";

export const pythonScript = `from torch import autocast
from diffusers import StableDiffusionPipeline
from http.server import BaseHTTPRequestHandler, HTTPServer

print('loading...')

pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4",
        use_auth_token="${args.hfToken}"
).to("cuda")

print('leady')

class Handle(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get('content-length'))
        post_body = self.rfile.read(content_len).decode('utf-8')
        print(post_body)
        with autocast("cuda"):
            image = pipe(post_body)["sample"][0]

        image.save("girl.png")
        self.send_response(200)
        self.end_headers()
        self.wfile.write('ok\n'.encode())

HTTPServer(('', 8080), Handle).serve_forever()

print('served')
`;
