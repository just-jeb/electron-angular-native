simple_library = simplelib.so
simple_library_objects = StringProvider.o

INCLUDES = \
 
CPPFLAGS_BASE = -Wall -Werror -fPIC

LDFLAGS_BASE = -shared -Wall -fPIC -Wl,--no-undefined

32bit: CPPFLAGS = $(CPPFLAGS_BASE) -m32
32bit: LDFLAGS = $(LDFLAGS_BASE) -m32
32bit: OUTPUT_DIR = Release
32bit: $(simple_library) clean_objects

64bit: CPPFLAGS = $(CPPFLAGS_BASE) -m64
64bit: LDFLAGS = $(LDFLAGS_BASE) -m64
64bit: OUTPUT_DIR = x64/Release
64bit: $(simple_library) clean_objects

$(simple_library): $(simple_library_objects) 
	$(CXX) $^ $(LDFLAGS) -o $(OUTPUT_DIR)/$@

%.o: %.cpp
	$(CXX) -c $(CPPFLAGS) $(DEFS) $(INCLUDES) $^


clean_objects:
	rm -f *.o

clean: clean_objects
	rm -f Release/$(simple_library) x64/Release/$(simple_library)


