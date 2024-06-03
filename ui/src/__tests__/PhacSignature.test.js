import { expect, it, describe } from 'vitest'
import { within, render, screen } from '@testing-library/react'
import { PhacSignature } from '../PhacSignature.js'

describe('<PhacSignature />', () => {
  describe('when no arguments are passed', () => {
    it('renders an image', async () => {
      render(<PhacSignature />)
      const image = await screen.findByRole('img')
      expect(image).toBeTruthy()
    })

    it('contains an alt-text aria-label whose text defaults to English', async () => {
      render(<PhacSignature language="en" />)
      const image = await screen.findByRole('img')
      expect(image.getAttribute('aria-label')).toEqual(
        'PHAC Logo with Canadian flag',
      )
    })

    it('gives the french a noop transform', async () => {
      const { container } = render(<PhacSignature language="en" />)
      const text = within(container).getByTestId('french')
      expect(text.getAttribute('transform')).toEqual('translate(0 0)')
    })

    it('gives the English text a noop transform', async () => {
      const { container } = render(<PhacSignature language="en" />)
      const text = within(container).getByTestId('english')
      expect(text.getAttribute('transform')).toEqual('translate(0 0)')
    })
  })

  describe("when the language prop is set to 'fr'", () => {
    it('contains an alt-text aria-label whose text is French', async () => {
      render(<PhacSignature language="fr" />)
      const image = await screen.findByRole('img')
      expect(image.getAttribute('aria-label')).toEqual(
        'Logo de la ASPC avec Drapeau Canadien',
      )
    })

    it('slides the English text to the right', async () => {
      const { container } = render(<PhacSignature language="fr" />)
      const text = within(container).getByTestId('english')
      expect(text.getAttribute('transform')).toEqual('translate(163 0)')
    })

    it('slides the French text to the left', async () => {
      const { container } = render(<PhacSignature language="fr" />)
      const text = within(container).getByTestId('french')
      expect(text.getAttribute('transform')).toEqual('translate(-164 0)')
    })
  })
})
