<?php

namespace App\Http\Requests\Tanding;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Sesuaikan dengan kebutuhan otorisasi Anda
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'atlet_id' => 'nullable|exists:atlet,id',
            'tim_id' => 'nullable|exists:tim,id',
            'kategori_tanding_id' => 'required|exists:kategori_tanding,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'atlet_id.exists' => 'ID atlet tidak valid.',
            'tim_id.exists' => 'ID tim tidak valid.',
            'kategori_tanding_id.required' => 'Kategori tanding wajib diisi.',
            'kategori_tanding_id.exists' => 'ID kategori tanding tidak valid.',
        ];
    }
}
