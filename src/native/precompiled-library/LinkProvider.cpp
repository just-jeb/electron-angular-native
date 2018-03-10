#if defined _WIN32 || defined WIN32
    #define LIB_EXPORT __declspec(dllexport)
#else
    #define LIB_EXPORT
#endif

#ifdef __cplusplus
extern "C"
{
#endif
	LIB_EXPORT char const* getLink()
	{
    return "https://github.com/node-ffi/node-ffi";
	}
#ifdef __cplusplus
}
#endif

