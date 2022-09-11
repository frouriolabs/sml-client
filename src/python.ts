import { config } from "./config.ts";

export const pythonScript = `from torch import autocast
from diffusers import StableDiffusionPipeline
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import os

print('loading')

pipe = StableDiffusionPipeline.from_pretrained(
    'CompVis/stable-diffusion-v1-4',
    use_auth_token='${config.token.hf}'
).to('cuda')

print('leady')

dirname = 'output'

if not os.path.exists(dirname):
    os.mkdir(dirname)

class Handle(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get('content-length'))
        post_body = self.rfile.read(content_len).decode('utf-8')
        print(post_body)
        with autocast('cuda'):
            image = pipe(post_body)['sample'][0]

        filename = dirname + '/' + str(int(time.time())) + '.png'
        image.save(filename)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(filename.encode())

HTTPServer(('', ${config.port.python}), Handle).serve_forever()

print('served')
`;
