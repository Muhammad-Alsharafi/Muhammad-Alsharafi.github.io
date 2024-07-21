import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:audioplayers/audioplayers.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'The cherry',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late VideoPlayerController _controller1;
  late VideoPlayerController _controller2;
  final AudioPlayer _audioPlayer = AudioPlayer();

  bool _isPlayingFirstVideo = true;
  String _displayText = "Don't hit the cherry";

  @override
  void initState() {
    super.initState();
    _controller1 = VideoPlayerController.asset(
      'assets/wave_3ba974db.gif.mp4',
      videoPlayerOptions: VideoPlayerOptions(mixWithOthers: true),
    )
      ..initialize().then((_) {
        setState(() {});
        _controller1.setLooping(true);
        _controller1.play();
      });

    _controller2 = VideoPlayerController.asset(
      'assets/sob_6e4a57eb.gif.mp4',
      videoPlayerOptions: VideoPlayerOptions(mixWithOthers: true),
    )
      ..initialize().then((_) {
        setState(() {});
        _controller2.setLooping(true); // Set the second video to loop
      });

    _audioPlayer.onPlayerComplete.listen((event) {
      setState(() {
        _controller2.pause();
        _controller2.seekTo(Duration.zero);
        _controller1.play();
        _isPlayingFirstVideo = true;
        _displayText = "Don't hit the cherry ";
      });
    });
  }

  @override
  void dispose() {
    _controller1.dispose();
    _controller2.dispose();
    _audioPlayer.dispose();
    super.dispose();
  }

  void _playSecondVideoAndSound() async {
    if (_isPlayingFirstVideo) {
      setState(() {
        _isPlayingFirstVideo = false;
        _displayText = "Happy now ? she is crying ";
      });

      _controller1.pause();
      _controller2.play();
      
      // Play the sound and ensure the video continues playing
      await _audioPlayer.play(AssetSource('plors-75447.mp3')).then((_) {
        _audioPlayer.onPlayerComplete.listen((event) {
          setState(() {
            _controller2.pause();
            _controller2.seekTo(Duration.zero);
            _controller1.play();
            _isPlayingFirstVideo = true;
            _displayText = "Don't hit the cherry";
          });
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('The cherry'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: _playSecondVideoAndSound,
              child: _isPlayingFirstVideo
                  ? _controller1.value.isInitialized
                      ? AspectRatio(
                          aspectRatio: _controller1.value.aspectRatio,
                          child: VideoPlayer(_controller1),
                        )
                      : CircularProgressIndicator()
                  : _controller2.value.isInitialized
                      ? AspectRatio(
                          aspectRatio: _controller2.value.aspectRatio,
                          child: VideoPlayer(_controller2),
                        )
                      : CircularProgressIndicator(),
            ),
            SizedBox(height: 20),
            Text(
              _displayText,
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}
