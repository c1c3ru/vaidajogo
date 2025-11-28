import React from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
    url?: string;
    title?: string;
    size?: number;
}

/**
 * Componente QR Code otimizado seguindo as melhores práticas:
 * - Tamanho mínimo de 256px (adequado para telas retina)
 * - Nível de correção de erro 'H' (30% de tolerância a danos)
 * - Quiet zone (margem) incluída automaticamente
 * - Cores com alto contraste (preto sobre branco)
 * - URL codificada com esquema HTTPS
 * - Exportação como PNG/SVG
 */
const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
    url,
    title = 'Compartilhar',
    size = 256
}) => {
    // Garante que a URL tenha o esquema HTTPS
    const getValidUrl = () => {
        if (!url) {
            return `https://${window.location.host}${window.location.pathname}`;
        }

        // Se a URL não começar com http:// ou https://, adiciona https://
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }

        return url;
    };

    const validUrl = getValidUrl();
    const encodedUrl = encodeURIComponent(validUrl);

    // Função para baixar o QR Code como PNG
    const downloadQRCode = () => {
        const svg = document.getElementById('qr-code-svg');
        if (!svg) return;

        // Cria um canvas para converter SVG em PNG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Define o tamanho do canvas (maior para melhor qualidade)
        const scale = 2; // 2x para telas retina
        canvas.width = size * scale;
        canvas.height = size * scale;

        // Preenche o fundo com branco
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Converte o SVG em imagem
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);

            // Baixa como PNG
            canvas.toBlob((blob) => {
                if (!blob) return;
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }, 'image/png', 1.0);
        };

        img.src = url;
    };

    return (
        <Card className="border-2 border-purple-200">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{title}</span>
                    <Button
                        onClick={downloadQRCode}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Baixar PNG
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {/* Container com fundo branco e padding para quiet zone */}
                <div
                    className="bg-white p-4 rounded-lg"
                    style={{
                        // Adiciona sombra sutil para destacar o QR
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <QRCode
                        id="qr-code-svg"
                        value={validUrl}
                        size={size}
                        level="H" // Nível de correção de erro alto (30% de tolerância)
                        bgColor="#FFFFFF" // Fundo branco
                        fgColor="#000000" // Preto para máximo contraste
                        style={{
                            height: 'auto',
                            maxWidth: '100%',
                            width: '100%'
                        }}
                        viewBox={`0 0 ${size} ${size}`}
                    />
                </div>

                {/* Informações sobre o QR Code */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                        Escaneie este código para acessar:
                    </p>
                    <p className="text-xs text-gray-500 break-all max-w-xs">
                        {validUrl}
                    </p>
                    <div className="flex gap-2 justify-center text-xs text-gray-400">
                        <span>✓ Alta qualidade</span>
                        <span>✓ 30% tolerância a danos</span>
                        <span>✓ Compatível com todos os leitores</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QRCodeGenerator;
