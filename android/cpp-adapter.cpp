#include <jni.h>
#include "react-native-test.h"

extern "C"
JNIEXPORT jstring JNICALL
Java_com_test_TestModule_nativeconcat(JNIEnv* env, jclass type, jstring a, jstring b) {
    const char* nativeStringA = env->GetStringUTFChars(a, nullptr);
    const char* nativeStringB = env->GetStringUTFChars(b, nullptr);

    const char* concatenated = test::concat(nativeStringA, nativeStringB);

    env->ReleaseStringUTFChars(a, nativeStringA);
    env->ReleaseStringUTFChars(b, nativeStringB);

    jstring result = env->NewStringUTF(concatenated);

    return result;
};
