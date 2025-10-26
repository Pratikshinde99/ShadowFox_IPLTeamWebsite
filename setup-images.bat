@echo off
echo ========================================
echo RCB Universe - Image Directory Setup
echo ========================================
echo.

cd frontend\public

echo Creating image directories...
mkdir images 2>nul
mkdir images\players 2>nul
mkdir images\moments 2>nul

echo.
echo ✓ Created: frontend\public\images\
echo ✓ Created: frontend\public\images\players\
echo ✓ Created: frontend\public\images\moments\
echo.
echo ========================================
echo Directory structure created successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Add player images to: frontend\public\images\players\
echo 2. Add moment images to: frontend\public\images\moments\
echo 3. Refer to IMAGE_SETUP_GUIDE.md for details
echo.
pause
