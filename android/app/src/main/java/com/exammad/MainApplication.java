package com.exammad;
import org.reactnative.camera.RNCameraPackage;
import android.app.Application;
import com.facebook.react.ReactApplication;
import com.chirag.RNMail.RNMail;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.kiwi.reversegeocode.RNReverseGeocodePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import java.util.Arrays;
import java.util.List;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNFusedLocationPackage(),
          new RNCameraPackage(),
          new MainReactPackage(),
            new RNMail(),
            new RNGeocoderPackage(),
            new RNGestureHandlerPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
