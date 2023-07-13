#include "react-native-test.h"
#include <string>
#include <cstring>
namespace test {
	const char* concat(const char* a, const char* b) {
        std::string result = std::string(a) + std::string(b);
        char* concatenated = new char[result.length() + 1]; // +1 for null-terminator
        std::strcpy(concatenated, result.c_str());
        return concatenated;
    }
}
