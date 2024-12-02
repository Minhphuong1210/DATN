<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Eager load 'user' and 'product' relationships
    $comment = Comment::with(['user', 'product'])->get();

    return view('Admin.Comment.index', compact('comment'));
}

public function update($id)
{
    // Find the comment by ID
    $comment = Comment::findOrFail($id);

    // Update the status
    $comment->status = request()->input('status');
    $comment->save();

    // Redirect back to the comment list with a success message
    return redirect()->route('admins.comment.index')->with('success', 'Thay đổi trạng thái thành công');
}

}
