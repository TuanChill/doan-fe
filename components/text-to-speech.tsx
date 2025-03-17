"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextToSpeechPlayerProps {
  sections: {
    title: string;
    content: string;
  }[];
}

export default function TextToSpeechPlayer({
  sections,
}: TextToSpeechPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textContentRef = useRef<string>("");

  // Initialize speech synthesis and load voices
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        if (availableVoices.length > 0) {
          setVoices(availableVoices);

          // Try to find Vietnamese voice or use the first available
          const vietnameseVoice = availableVoices.find((voice) =>
            voice.lang.includes("vi")
          );
          setSelectedVoice(vietnameseVoice || availableVoices[0] || null);
        } else {
          // If voices aren't loaded yet, try again after a delay
          setTimeout(loadVoices, 100);
        }
      };

      // Initial load
      loadVoices();

      // Set up event listener for when voices are changed/loaded
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Function to speak the current section
  const speakSection = (index: number) => {
    if (!synthRef.current || !selectedVoice || index >= sections.length) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    // Create text to speak
    const text = `${sections[index].title}. ${sections[index].content}`;
    textContentRef.current = text;
    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice and rate
    utterance.voice = selectedVoice;
    utterance.rate = speechRate;

    // Track progress
    utterance.onboundary = (e) => {
      if (e.charIndex !== undefined) {
        setCurrentCharIndex(e.charIndex);
      }
    };

    // Handle when speech ends
    utterance.onend = () => {
      if (index < sections.length - 1) {
        setCurrentSectionIndex(index + 1);
        setCurrentCharIndex(0);
        speakSection(index + 1);
      } else {
        setIsPlaying(false);
        setCurrentCharIndex(0);
      }
    };

    // Start speaking
    synthRef.current.speak(utterance);
    utteranceRef.current = utterance;
    setIsPlaying(true);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        speakSection(currentSectionIndex);
      }
      setIsPlaying(true);
    }
  };

  // Stop speech and minimize player
  const stopAndClose = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsMinimized(true);
  };

  // Go to previous section
  const goToPrevious = () => {
    if (currentSectionIndex > 0) {
      const newIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(newIndex);
      setCurrentCharIndex(0);
      speakSection(newIndex);
    }
  };

  // Go to next section
  const goToNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      const newIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(newIndex);
      setCurrentCharIndex(0);
      speakSection(newIndex);
    }
  };

  // Handle voice change
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find((v) => v.name === e.target.value);
    if (!voice || !synthRef.current) return;

    // Update the selected voice
    setSelectedVoice(voice);

    // If currently speaking, restart with new voice
    if (synthRef.current.speaking || synthRef.current.paused) {
      // Cancel current speech
      synthRef.current.cancel();

      // Create a new utterance with the entire content
      const allContent = sections
        .map((section) => `${section.title}. ${section.content}`)
        .join(" ");

      const utterance = new SpeechSynthesisUtterance(allContent);
      utterance.voice = voice;
      utterance.rate = speechRate;

      // Start speaking with the new voice
      synthRef.current.speak(utterance);
      utteranceRef.current = utterance;
      setIsPlaying(true);
    }
  };

  // Handle rate change
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = Number.parseFloat(e.target.value);

    // Update the rate state
    setSpeechRate(newRate);

    // If currently speaking, apply the new rate without restarting
    if (synthRef.current && synthRef.current.speaking) {
      // Get the current state
      const wasPaused = synthRef.current.paused;

      // We need to cancel and recreate because SpeechSynthesis doesn't allow
      // changing rate of current utterance directly
      synthRef.current.cancel();

      // Create a new utterance starting from the current position
      const remainingText = textContentRef.current.substring(currentCharIndex);
      const utterance = new SpeechSynthesisUtterance(remainingText);
      utterance.voice = selectedVoice;
      utterance.rate = newRate;

      // Handle when this segment ends
      utterance.onend = () => {
        if (currentSectionIndex < sections.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setCurrentCharIndex(0);
          speakSection(currentSectionIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentCharIndex(0);
        }
      };

      // Start speaking with the new rate
      synthRef.current.speak(utterance);
      utteranceRef.current = utterance;

      // If it was paused, pause it again
      if (wasPaused) {
        setTimeout(() => {
          synthRef.current?.pause();
        }, 50);
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-white rounded-lg shadow-lg z-50",
        isMinimized ? "w-12 h-12" : "w-80"
      )}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center bg-gray-800 text-white rounded-lg"
        >
          <Play size={20} />
        </button>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">Trình đọc văn bản</span>
            <button
              onClick={stopAndClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="voice-select" className="text-xs block mb-1">
              Giọng đọc:
            </label>
            <select
              id="voice-select"
              className="w-full p-2 text-sm border rounded"
              value={selectedVoice?.name || ""}
              onChange={handleVoiceChange}
            >
              {voices.length === 0 ? (
                <option value="">Đang tải giọng đọc...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="speech-rate" className="text-xs block mb-1">
              Tốc độ đọc: {speechRate.toFixed(1)}x
            </label>
            <input
              id="speech-rate"
              type="range"
              min="0"
              max="2"
              step="0.5"
              value={speechRate}
              onChange={handleRateChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={goToPrevious}
              className="text-gray-800 p-2 hover:bg-gray-100 rounded-full"
              disabled={currentSectionIndex === 0}
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 mx-2"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={goToNext}
              className="text-gray-800 p-2 hover:bg-gray-100 rounded-full"
              disabled={currentSectionIndex === sections.length - 1}
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            Đang đọc phần {currentSectionIndex + 1} / {sections.length}
          </div>
        </div>
      )}
    </div>
  );
}
