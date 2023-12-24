import keyboard
import time

def auto_runner():
    print("Auto Runner: Press 'Ctrl + C' to stop.")

    while True:
        keyboard.press('shift')
        keyboard.press('w')
        time.sleep(1)  # Adjust the sleep duration based on WSW
        keyboard.press('s')
        time.sleep(1)  # Adjust the sleep duration based on your game's speed
        keyboard.release('s')

if __name__ == "__main__":
    try:
        auto_runner()
    except KeyboardInterrupt:
        print("\nAuto Runner stopped.")
