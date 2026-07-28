import http.server
import functools
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
server = http.server.ThreadingHTTPServer(("0.0.0.0", 4173), handler)
server.serve_forever()
