Add-Type -AssemblyName System.Drawing

$typeDefinition = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public static class LogoBackgroundCleaner
{
    private static double Lerp(double a, double b, double t)
    {
        return a + ((b - a) * t);
    }

    private static double Clamp(double value, double min, double max)
    {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    private static int GetAlpha(double distance, double brightnessDiff)
    {
        double distanceAlpha = Clamp((((distance - 10.0) / 38.0) * 255.0), 0.0, 255.0);
        double brightnessAlpha = Clamp((((brightnessDiff - 6.0) / 34.0) * 255.0), 0.0, 255.0);
        int alpha = (int)Math.Round(Math.Max(distanceAlpha, brightnessAlpha));
        return alpha < 48 ? 0 : alpha;
    }

    public static string Clean(string sourcePath, string outputPath)
    {
        using (var sourceFull = (Bitmap)Image.FromFile(sourcePath))
        {
            const int targetWidth = 640;
            int targetHeight = (int)Math.Round((sourceFull.Height / (double)sourceFull.Width) * targetWidth);

            using (var source = new Bitmap(targetWidth, targetHeight, PixelFormat.Format24bppRgb))
            {
                using (var resizeGraphics = Graphics.FromImage(source))
                {
                    resizeGraphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    resizeGraphics.SmoothingMode = SmoothingMode.HighQuality;
                    resizeGraphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    resizeGraphics.DrawImage(sourceFull, 0, 0, targetWidth, targetHeight);
                }

                int width = source.Width;
                int height = source.Height;

                Color topLeft = source.GetPixel(5, 5);
                Color topRight = source.GetPixel(width - 6, 5);
                Color bottomLeft = source.GetPixel(5, height - 6);
                Color bottomRight = source.GetPixel(width - 6, height - 6);

                using (var transparentBitmap = new Bitmap(width, height, PixelFormat.Format32bppArgb))
                {
                    int minX = width;
                    int minY = height;
                    int maxX = 0;
                    int maxY = 0;

                    for (int y = 0; y < height; y++)
                    {
                        double v = y / (double)(height - 1);

                        for (int x = 0; x < width; x++)
                        {
                            double u = x / (double)(width - 1);

                            double topR = Lerp(topLeft.R, topRight.R, u);
                            double topG = Lerp(topLeft.G, topRight.G, u);
                            double topB = Lerp(topLeft.B, topRight.B, u);
                            double bottomR = Lerp(bottomLeft.R, bottomRight.R, u);
                            double bottomG = Lerp(bottomLeft.G, bottomRight.G, u);
                            double bottomB = Lerp(bottomLeft.B, bottomRight.B, u);

                            double backgroundR = Lerp(topR, bottomR, v);
                            double backgroundG = Lerp(topG, bottomG, v);
                            double backgroundB = Lerp(topB, bottomB, v);

                            Color pixel = source.GetPixel(x, y);
                            double deltaR = pixel.R - backgroundR;
                            double deltaG = pixel.G - backgroundG;
                            double deltaB = pixel.B - backgroundB;
                            double distance = Math.Sqrt((deltaR * deltaR) + (deltaG * deltaG) + (deltaB * deltaB));

                            double pixelBrightness = (0.299 * pixel.R) + (0.587 * pixel.G) + (0.114 * pixel.B);
                            double backgroundBrightness = (0.299 * backgroundR) + (0.587 * backgroundG) + (0.114 * backgroundB);
                            double brightnessDiff = pixelBrightness - backgroundBrightness;

                            int alpha = GetAlpha(distance, brightnessDiff);
                            if (alpha < 6)
                            {
                                transparentBitmap.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                                continue;
                            }

                            transparentBitmap.SetPixel(x, y, Color.FromArgb(alpha, pixel.R, pixel.G, pixel.B));

                            if (alpha > 18)
                            {
                                if (x < minX) minX = x;
                                if (y < minY) minY = y;
                                if (x > maxX) maxX = x;
                                if (y > maxY) maxY = y;
                            }
                        }
                    }

                    int padding = 28;
                    int cropX = Math.Max(0, minX - padding);
                    int cropY = Math.Max(0, minY - padding);
                    int cropWidth = Math.Min(width - cropX, (maxX - minX + 1) + (padding * 2));
                    int cropHeight = Math.Min(height - cropY, (maxY - minY + 1) + (padding * 2));

                    using (var cropped = new Bitmap(cropWidth, cropHeight, PixelFormat.Format32bppArgb))
                    {
                        using (var graphics = Graphics.FromImage(cropped))
                        {
                            graphics.Clear(Color.Transparent);
                            graphics.DrawImage(
                                transparentBitmap,
                                new Rectangle(0, 0, cropWidth, cropHeight),
                                new Rectangle(cropX, cropY, cropWidth, cropHeight),
                                GraphicsUnit.Pixel
                            );
                        }

                        cropped.Save(outputPath, ImageFormat.Png);
                    }

                    return string.Format("Saved: {0} | Crop: {1}x{2} from {3},{4}", outputPath, cropWidth, cropHeight, cropX, cropY);
                }
            }
        }
    }
}
"@

Add-Type -TypeDefinition $typeDefinition -ReferencedAssemblies System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root "public\\logojwluxury.jpeg"
$outputPath = Join-Path $root "public\\logo-jw-transparent-clean-v2.png"

[LogoBackgroundCleaner]::Clean($sourcePath, $outputPath)
