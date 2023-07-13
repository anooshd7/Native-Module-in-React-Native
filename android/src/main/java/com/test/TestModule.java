package com.test;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = TestModule.NAME)
public class TestModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Test";

  public TestModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }

  private static native String nativeconcat(String a, String b);

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void concat(String a, String b, Promise promise) {
    promise.resolve(nativeconcat(a, b));
  }
}
