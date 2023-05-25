import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'

import { transformedDate, transformedName } from 'shared/lib'

interface ICreatePDFProps {
	element: HTMLElement
	format?: 'A3' | 'A4'
	indents?: number
}

interface IPDFProps {
	dataUrl: string
	pageSize: {
		width: number
		height: number
	}
	pageOrientation: 'LANDSCAPE' | 'PORTIET'
	contentSize: {
		width: number
		height: number
	}
	pageMargins: number[]
}

interface ICreatePDFFromHTML extends ICreatePDFProps {
	name: string
	suffix: string
}

const DPI = 2.83464566929 // 72

const PAGE_DIMENSIONS_A3 = { HEIGHT: 297 * DPI, MARGINS: [8 * DPI, 8 * DPI, 8 * DPI, 8 * DPI], WIDTH: 419 * DPI }
const PAGE_DIMENSIONS_A4 = { HEIGHT: 297 * DPI, MARGINS: [8 * DPI, 8 * DPI, 8 * DPI, 8 * DPI], WIDTH: 210 * DPI }

const createPdfProps = async ({ element, format, indents }: ICreatePDFProps): Promise<IPDFProps> => {
	const PAGE_DIMENSIONS = format === 'A3' ? PAGE_DIMENSIONS_A3 : PAGE_DIMENSIONS_A4
	const CONTENT_DIMENSIONS = PAGE_DIMENSIONS

	const canvas = await html2canvas(element, { scale: 2 })

	const pdfProps: IPDFProps = {
		contentSize: {
			height: CONTENT_DIMENSIONS.HEIGHT,
			width: CONTENT_DIMENSIONS.WIDTH
		},
		dataUrl: canvas.toDataURL(),
		pageMargins: indents ? [indents * DPI, indents * DPI, indents * DPI, indents * DPI] : PAGE_DIMENSIONS.MARGINS,
		pageOrientation: 'LANDSCAPE',
		pageSize: {
			height: PAGE_DIMENSIONS.HEIGHT,
			width: PAGE_DIMENSIONS.WIDTH
		}
	}

	return pdfProps
}

const createPdf = (pdfProps: any, facilityName: string, format?: 'A3' | 'A4', indents?: number, suffix?: string) => {
	const { dataUrl, contentSize, pageMargins, pageSize, pageOrientation } = pdfProps

	const formatSuffix = format ? `-${format}` : ''
	const typeSuffix = suffix ? `-${suffix}` : ''

	const dimensions = {
		content: [{ image: dataUrl, ...contentSize }],
		pageMargins,
		pageOrientation,
		pageSize
	}

	pdfMake.createPdf(dimensions).download(`${transformedDate}-${transformedName(facilityName)}${formatSuffix}${typeSuffix}.pdf`)
}

export const createPdfFromHtml = async ({ element, name, format, indents, suffix }: ICreatePDFFromHTML) => {
	const PDFProps = await createPdfProps({
		element,
		format,
		indents
	})
	createPdf(PDFProps, name, format, indents, suffix)
}
