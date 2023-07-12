#include <jni.h>
#include "react-native-test.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_test_TestModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return test::multiply(a, b);
}
