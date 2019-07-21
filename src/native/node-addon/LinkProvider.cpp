#include <nan.h>

using namespace Nan;

NAN_METHOD(GetLinkMethod) {
  v8::Local<v8::String> link = New("https://github.com/nodejs/nan").ToLocalChecked();
  info.GetReturnValue().Set(link);
}

NAN_MODULE_INIT(Init) {
  Set(target 
    , New("getLink").ToLocalChecked()
    , GetFunction(New<v8::FunctionTemplate>(GetLinkMethod)).ToLocalChecked()
  );
}

NODE_MODULE(StringProvider, Init)
