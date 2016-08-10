#ifdef __cplusplus
extern "C" {
#endif
	/*class __declspec(dllexport) StringProvider {
	public:*/
		__declspec(dllexport) char* getString() {
			return "c++ .dll string";
		}
	//};
#ifdef __cplusplus
}
#endif

