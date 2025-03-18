<?php

namespace App\Http\Requests\Atlet;

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
            'name' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:LAKI_LAKI,PEREMPUAN',
            'nik' => 'required|digits:16|unique:atlet,nik',
            'no_kk' => 'required|digits:16',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'berat_badan' => 'nullable|numeric|min:1|max:999.99',
            'tinggi_badan' => 'nullable|numeric|min:1|max:999.99',
            'foto_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'kk_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:4096',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib diisi.',
            'jenis_kelamin.in' => 'Jenis kelamin harus salah satu dari: LAKI_LAKI, PEREMPUAN.',
            'nik.required' => 'NIK wajib diisi.',
            'nik.digits' => 'NIK harus 16 digit.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'no_kk.required' => 'Nomor KK wajib diisi.',
            'no_kk.digits' => 'Nomor KK harus 16 digit.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.date' => 'Tanggal lahir harus berupa tanggal yang valid.',
            'tempat_lahir.required' => 'Tempat lahir wajib diisi.',
            'tempat_lahir.string' => 'Tempat lahir harus berupa string.',
            'tempat_lahir.max' => 'Tempat lahir maksimal 255 karakter.',
            'berat_badan.numeric' => 'Berat badan harus berupa angka.',
            'berat_badan.min' => 'Berat badan minimal 1.',
            'berat_badan.max' => 'Berat badan maksimal 999.99.',
            'tinggi_badan.numeric' => 'Tinggi badan harus berupa angka.',
            'tinggi_badan.min' => 'Tinggi badan minimal 1.',
            'tinggi_badan.max' => 'Tinggi badan maksimal 999.99.',
            'foto_profile.image' => 'Foto Profile harus berupa gambar.',
            'foto_profile.mimes' => 'Foto Profile harus berupa file dengan tipe: jpeg, png, jpg, gif, svg.',
            'foto_profile.max' => 'Foto Profile maksimal berukuran 2MB.',
            'kk_photo.image' => 'Foto KK harus berupa gambar.',
            'kk_photo.mimes' => 'Foto KK harus berupa file dengan tipe: jpeg, png, jpg.',
            'kk_photo.max' => 'Foto KK maksimal berukuran 4MB.',
        ];
    }
}
