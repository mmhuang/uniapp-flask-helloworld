本项目是使用一些精简的代码片段，解析uniapp与flask框架集成中的一些常见问题。

# uni-flask 怎样登录认证

# flask 怎样设定多个静态文件目录

uniapp生成的目录结构是:
```
\h5\index.html
\h5\static\index.63b34199.css
\h5\static\index.html
\h5\static\logo.png
\h5\static\fonts\uniicons.b6d3756e.ttf
\h5\static\js\chunk-vendors.5d68fdd9.js
...

```

需要将目录h5映射为/h5
将h5/index.html映射为 /static

可以通过增加blueprint实现。

```
h5_bp = Blueprint('h5', __name__ , static_folder='h5', static_url_path='/h5')
app = Flask(__name__, static_folder='h5/static', static_url_path='/static')
app.register_blueprint(h5_bp)
```

