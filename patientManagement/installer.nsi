!macro customInstall
  DetailPrint "Creating virtual environment..."
  nsExec::ExecToLog '"$INSTDIR\python\python.exe" -m venv "$INSTDIR\venv"'

  DetailPrint "Installing dependencies..."
  nsExec::ExecToLog '"$INSTDIR\venv\Scripts\pip.exe" install -r "$INSTDIR\requirements.txt"'
!macroend